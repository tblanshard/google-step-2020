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

import com.google.gson.Gson;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Returns bike data as a JSON object, e.g. {"2017": 52, "2018": 34}] */
@WebServlet("/dec-bike-data")
public class DecBikeServlet extends HttpServlet {

  private LinkedHashMap<Integer, Float> decBikes = new LinkedHashMap<>();

  @Override
  public void init() {
    System.out.println("test");
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/dec-bike-averages.csv"));
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      Integer stationID = Integer.valueOf(cells[0]);
      Float averageDuration = Float.parseFloat(cells[1]);

      decBikes.put(stationID, averageDuration);
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(decBikes);
    response.getWriter().println(json);
  }
}
