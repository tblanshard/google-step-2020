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

package com.google.sps;

import java.util.*;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    //input: collection of events and the request
    //output: collection of possible times the event could be held

    //go through and find all of the events being attended by the attendees of the meeting

    List<TimeRange> attendedEvents = new ArrayList<TimeRange>();
    Collection<String> meetingAttendees = request.getAttendees();

    for (Event event : events) {
      Set<String> eventAttendees = event.getAttendees();
      for (String attendee : meetingAttendees) {
        if (eventAttendees.contains(attendee)) {
          attendedEvents.add(event.getWhen());
        }
      }
    }

    //go through the day and work out spare time slots

    Collection<TimeRange> possibleTimes = new ArrayList<>();

    int startOfDay = TimeRange.START_OF_DAY;
    int endOfDay = TimeRange.END_OF_DAY;

    //add endpoints - i.e. time before first event and time after last event

    //sort the events being attended in order of start time to find the event that starts first
    Collections.sort(attendedEvents, TimeRange.ORDER_BY_START);
    TimeRange start = TimeRange.fromStartEnd(startOfDay, attendedEvents.get(0).start(), false);
    possibleTimes.add(start);

    //sort the events being attended in order of end time to find the event that ends last
    Collections.sort(attendedEvents, TimeRange.ORDER_BY_END);
    TimeRange end = TimeRange.fromStartEnd(attendedEvents.get(attendedEvents.size() - 1).start(), endOfDay, false);
    possibleTimes.add(end);

    return possibleTimes;

  }
}
