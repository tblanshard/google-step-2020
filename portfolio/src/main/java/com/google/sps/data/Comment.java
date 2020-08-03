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

package com.google.sps.data;

public final class Comment{

  private final String name;
  private final String dateTime;
  private final String message;
  private final String email;
  private final String sentimentScore;
  private final String blobKey;

  public Comment(String name, String dateTime, String message, String email, String sentimentScore, String blobKey){
    this.name = name;
    this.dateTime = dateTime;
    this.message = message;
    this.email = email;
    this.sentimentScore = sentimentScore;
    this.blobKey = blobKey;
  }

} 