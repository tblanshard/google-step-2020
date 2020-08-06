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

  int startOfDay = TimeRange.START_OF_DAY;
  int endOfDay = TimeRange.END_OF_DAY;

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    Collection<TimeRange> possibleTimes = new ArrayList<>();

    //check whether the request is valid
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
      return possibleTimes;
    }

    //check if there are any mandatory attendees
    if (request.getAttendees().size() == 0) {

      //find events being attended by optional attendees
      Collection<String> optionalAttendees = request.getOptionalAttendees();
      List<TimeRange> optionalAttendedEvents = getEventsForMeetingAttendees(events, optionalAttendees);

      possibleTimes = findPossibleSlots(optionalAttendedEvents, request.getDuration());

      if (possibleTimes.size() == 0) {
        return Arrays.asList(TimeRange.WHOLE_DAY);
      } else {
        return possibleTimes;
      }

      //check if there are any gaps in optional attendees schdule
        //NO - return TimeRange.WHOLE_DAY
        //YES - return slots as if mandatory attendees
    } else {

      //find the events being attended by the mandatory attendees
      Collection<String> mandatoryAttendees = request.getAttendees();
      List<TimeRange> attendedEvents = getEventsForMeetingAttendees(events, mandatoryAttendees);

      if (request.getOptionalAttendees().size() == 0) {
        return findPossibleSlots(attendedEvents, request.getDuration());
      } else {

        //find events being attended by optional attendees
        Collection<String> optionalAttendees = request.getOptionalAttendees();
        List<TimeRange> optionalAttendedEvents = getEventsForMeetingAttendees(events, optionalAttendees);

        //check whether the optional attendees could attend attend anything
        Collection<TimeRange> optionalOptions = findPossibleSlots(optionalAttendedEvents, request.getDuration());

        if (optionalOptions.size() == 0) {
          return findPossibleSlots(attendedEvents, request.getDuration());
        } else {
          //merge the two lists of events
          List<TimeRange> mergedEvents = new ArrayList<>();
          mergedEvents.addAll(attendedEvents);
          mergedEvents.addAll(optionalAttendedEvents);

          Collection<TimeRange> mergedOptions = findPossibleSlots(mergedEvents, request.getDuration());
          
          //if there are no options for the merged events then we ignore
          //the optional attendees
          if (mergedOptions.size() == 0) {
            return findPossibleSlots(attendedEvents, request.getDuration());
          } else {
            return mergedOptions;
          }
        }
      }
    }
  }

  private Collection<TimeRange> findPossibleSlots(List<TimeRange> events, long duration) {
    //input: events to check, duration of the requested meeting
    //output: possible slots that match

    List<TimeRange> possibleSlots = new ArrayList<>();

    //check if there are any events to clash with
    if (events.size() == 0) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    //find endpoints

    Collections.sort(events, TimeRange.ORDER_BY_START);
    TimeRange start = TimeRange.fromStartEnd(startOfDay, events.get(0).start(), false);
    int startLength = start.duration();
    if (startLength >= duration || Objects.equals(startLength, duration)) {
      possibleSlots.add(start);
    }

    Collections.sort(events, TimeRange.ORDER_BY_END);
    TimeRange end = TimeRange.fromStartEnd(events.get(events.size() - 1).end(), endOfDay, true);
    int endLength = end.duration();
    if (endLength >= duration || Objects.equals(endLength, duration)) {
      possibleSlots.add(end);
    }

    //find the rest

    //possible scenarios
    //1) events are separate - i.e. end of 1 < start of 2
    //2) events overlap - i.e. end of 1 > start of 2
    //3) events are contained - i.e. end of 1 > start of 2 && end of 1 > end of 2
    Collections.sort(events, TimeRange.ORDER_BY_START);
    int currentEventMarker = 0;
    int nextEventMarker = 1;
    while (nextEventMarker <= events.size() - 1) {
      TimeRange currentEvent = events.get(currentEventMarker);
      TimeRange nextEvent = events.get(nextEventMarker);
      if (!currentEvent.contains(nextEvent) && !currentEvent.overlaps(nextEvent)) {
        //case1
        TimeRange between = TimeRange.fromStartEnd(currentEvent.end(), nextEvent.start(), false);
        long optionDuration = between.duration();
        if (optionDuration >= duration) {
          possibleSlots.add(between);
        }
        currentEventMarker++;
        nextEventMarker++;
      } else if (!currentEvent.contains(nextEvent) && currentEvent.overlaps(nextEvent)) {
        //case2
        currentEventMarker++;
        nextEventMarker++;
      } else if (currentEvent.contains(nextEvent)) {
        //case3
        //keep currentEvent the same but change nextEvent to next one
        nextEventMarker++;
      }
    }

    Collections.sort(possibleSlots, TimeRange.ORDER_BY_START);
    return possibleSlots;
  }

  private List<TimeRange> getEventsForMeetingAttendees(Collection<Event> events, Collection<String> people) {
    List<TimeRange> attendedEvents = new ArrayList<TimeRange>();

    for (Event event : events) {
      Set<String> eventAttendees = event.getAttendees();
      for (String attendee : people) {
        if (eventAttendees.contains(attendee)) {
          attendedEvents.add(event.getWhen());
        }
      }
    }
    return attendedEvents;        
  }
}

 