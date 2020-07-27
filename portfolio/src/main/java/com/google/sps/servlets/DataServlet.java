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
      Comment userComment = new Comment(userName, dateTime, userMessage, email);
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
    if (userMessage != "" && userName != "") {
      String emailAddress = userService.getCurrentUser().getEmail();
      LocalDateTime dateTime = LocalDateTime.now();
      DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
      String dateTimeFormatted = dateTime.format(format);
      commentEntity.setProperty("name", userName);
      commentEntity.setProperty("dateTime", dateTimeFormatted);
      commentEntity.setProperty("message", userMessage);
      commentEntity.setProperty("email", emailAddress);
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
}
