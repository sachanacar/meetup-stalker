    var key = '',
        m_id = '111532882',
        rsvp = 'yes',
        status = 'upcoming';
    var getEvents = "http://api.meetup.com/2/events?member_id="+m_id+"&rsvp="+rsvp+"&key="+key+"&status="+status+"&callback=?",
        group_picture,
        group_name,
        group_id = "14663772",
        event_title,
        event_comers,
        event_lattitude,
        event_longitude,
        event_date,
        event_address,
        even_url,
        event_description,
        event_venue,
        event_country,
        event_city;

    $.getJSON(getEvents, function(data) {
        if (data.status && data.status.match(/^200/) == null) {
            alert(data.status + ": " + data.details);
        } else {
                var event = data.results[0];
                console.log(event);
                group_id = event.group.id;
                getGroupPicture();

                group_name = event.group.name;
                event_title = event.name;
                event_url = event.event_url;
                event_count = event.yes_rsvp_count;
                event_comers = event.group.who;
                event_lattitude = event.venue.lat;
                event_longitude = event.venue.lon;
                event_date = new Date(event.time);
                event_venue = event.venue.name;
                event_address = event.venue.address_1;
                // mapAddress();
                event_country = event.venue.country;
                event_city = event.venue.city;
                description = event.description;

                $( "#group-name" ).html('<a id="event-url" href="'+event_url+'" title="Go to the event page" rel="author" class="link link-primary">'+group_name+'</a>');

                $( "#event-title" ).html(event_title);
                $( "#event-comers" ).html(event_count);

                $( "#event-venue" ).html(event_venue);
                $( "#event-address" ).html(event_address+', '+event_city+', '+event_country);
                $( "#event-date" ).html('On '+event_date);

                $( "#map").html('<img border="0" src="http://maps.googleapis.com/maps/api/staticmap?center='+event_address+','+event_city+','+event_country+'&amp;zoom=13&amp;size=600x200&amp;maptype=roadmap&amp;markers=color:red%7Clabel:'+event_venue+'%7C'+event_lattitude+','+event_longitude+'" alt="'+event_venue+'">');

                return  group_id;
        }
    });

    function getGroupPicture() {
        var getGroups = "http://api.meetup.com/2/groups?group_id="+group_id+"&key="+key+"&callback=?";

        $.getJSON(getGroups, function(data) {
            if (data.status && data.status.match(/^200/) == null) {
                alert(data.status + ": " + data.details);
            } else {
                    var group = data.results[0];
                    group_picture = group.group_photo.thumb_link;
                    $( "#group-picture" ).html('<a id="event-url" href="'+event_url+'" title="Go to the event page" rel="author" class="link link-primary"><img src="'+group_picture+'" class="card-avatar"/></a>');
            }
        });
    }
