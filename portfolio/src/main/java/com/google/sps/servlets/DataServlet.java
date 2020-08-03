// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.sps.data.Comment;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Integer numberOfComments = Integer.parseInt(request.getParameter("quantity"));
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Comment").addSort("dateTime", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();

    for (Entity entity : results.asIterable()){
      String userName = (String) entity.getProperty("name");
      String dateTime = (String) entity.getProperty("dateTime");
      String userMessage = (String) entity.getProperty("message");
      String email = (String) entity.getProperty("email");
      String sentimentScore = (String) entity.getProperty("sentimentScore");
      String blobKey = (String) entity.getProperty("blobKey");
      Comment userComment = new Comment(userName, dateTime, userMessage, email, sentimentScore, blobKey);
      comments.add(userComment);
    }
    
    response.setContentType("application/json;");
    Gson gson = new Gson();
    if (numberOfComments >= comments.size()){
      response.getWriter().println(gson.toJson(comments));
    } else {
      response.getWriter().println(gson.toJson(comments.subList(0,numberOfComments)));
    }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    Entity commentEntity = new Entity("Comment");
    String userName = getParameter(request, "userName", "");
    String userMessage = getParameter(request, "userMessage", "");

    Document doc =
        Document.newBuilder().setContent(userMessage).setType(Document.Type.PLAIN_TEXT).build();
    LanguageServiceClient languageService = LanguageServiceClient.create();
    Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
    float score = sentiment.getScore();
    String scoreAsString = Float.toString(score);
    languageService.close();

    if (userMessage != "" && userName != "") {
      String emailAddress = userService.getCurrentUser().getEmail();
      LocalDateTime dateTime = LocalDateTime.now();
      DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
      String dateTimeFormatted = dateTime.format(format);
      BlobKey blobKey = getUploadedFileUrl(request, "image");
      String blobKeyString;

      if (blobKey != null) {
        blobKeyString = blobKey.getKeyString();
      } else {
        blobKeyString = null;
      }

      commentEntity.setProperty("name", userName);
      commentEntity.setProperty("dateTime", dateTimeFormatted);
      commentEntity.setProperty("message", userMessage);
      commentEntity.setProperty("email", emailAddress);
      commentEntity.setProperty("sentimentScore", scoreAsString);
      commentEntity.setProperty("blobKey", blobKeyString);

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(commentEntity);
    }
    response.sendRedirect("/index.html#commentSection");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }

  /** Returns a URL that points to the uploaded file, or null if the user didn't upload a file. */
  private BlobKey getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get("image");

    // User submitted form without selecting a file, so we can't get a URL. (dev server)
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null;
    }

    // Our form only contains a single file input, so get the first index.
    BlobKey blobKey = blobKeys.get(0);

    // User submitted form without selecting a file, so we can't get a URL. (live server)
    BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
    if (blobInfo.getSize() == 0) {
      blobstoreService.delete(blobKey);
      return null;
    }

    // We could check the validity of the file here, e.g. to make sure it's an image file
    // https://stackoverflow.com/q/10779564/873165

    // Use ImagesService to get a URL that points to the uploaded file.
    //ImagesService imagesService = ImagesServiceFactory.getImagesService();
    //ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);

    // To support running in Google Cloud Shell with AppEngine's devserver, we must use the relative
    // path to the image, rather than the path returned by imagesService which contains a host.
    //try {
    //  URL url = new URL(imagesService.getServingUrl(options));
    //  return url.getPath();
    //} catch (MalformedURLException e) {
    //  return imagesService.getServingUrl(options);
    //}

    return blobKey;

  }
}


