// Copyright 2020 Google LLC
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

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.util.*;

@WebServlet("/user-login-check")
public class LoginStatusServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    response.setContentType("application/json");
    Gson gson = new Gson();
    List<String> responses = new ArrayList<>();
    if (userService.isUserLoggedIn()) {
      String userEmailAddress = userService.getCurrentUser().getEmail();
      responses.add(userEmailAddress);
    } else {
      String userEmailAddress = "";
      String userLoginURLRedirect = "/index.html#commentSection";
      String loginUrl = userService.createLoginURL(userLoginURLRedirect);
      responses.add(userEmailAddress);
      responses.add(loginUrl);
    }
    response.getWriter().println(gson.toJson(responses));
  }
}