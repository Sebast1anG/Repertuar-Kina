$(function() { 

  var calendar = $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'agendaWeek,agendaDay'
    },
    defaultView: 'agendaWeek',
    defaultTimedEventDuration: '01:00',
    allDaySlot: false,
    scrollTime: '08:00',
    businessHours: {
      start: '9:00',
      end: '18:00',
    },
    lang: /^en-/.test(navigator.language) ? 'en' : 'pl',
    eventOverlap: function(stillEvent, movingEvent)//zdarzenie przełączania widoku kalendarza
    {
      return true;
    },
    events: [{
      title: 'Tydzień',
      start: '2015-05-22T15:00+08:00'
    }, {
      title: 'Dział',
      start: '2015-05-22T12:00+08:00'
    }],
    editable: true,
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      var duration = (end - start) /1000;
      if(duration == 1800) {
        // set default duration to 1 hr.
        end = start.add(30, 'mins');
        return calendar.fullCalendar('select', start, end);
      }
      var title = prompt('Event Title:');
      var eventData; //zdarzenie tworzące wydarzenie
      if (title && title.trim()) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        calendar.fullCalendar('renderEvent', eventData);
      }
      calendar.fullCalendar('unselect');
    },
    eventRender: function(event, element) {
      var start = moment(event.start).fromNow();
      element.attr('title', start);
    },
    loading: function() {
      
    },
eventRender: function (event, element, view) {

            if (view.name == 'listDay') {
                element.find(".fc-list-item-time").append("<span class='closeon'>X</span>");
            } else {
                element.find(".fc-content").prepend("<span class='closeon'>X</span>");
            }
            element.find(".closeon").on('click', function () {
                $('#calendar').fullCalendar('removeEvents', event._id); //zdarzenie usuwające wydarzenie
            });
        },
    eventClick: function(calEvent, jsEvent, view) {
          var title = prompt('Event Title:', calEvent.title, { buttons: { Ok: true, Cancel: false} });

          if (title){
              calEvent.title = title;
              calendar.fullCalendar('updateEvent',calEvent);//zdarzenie zmiany treści wydarzenia 
          }
}
  });

});
