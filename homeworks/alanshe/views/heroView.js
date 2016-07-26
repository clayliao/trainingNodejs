"use strict";

function redner(request, response, context) {
    var hero, i = 0;
    response.write("<html><body>");
    for (i = 0; i < context.profile.heroes.length; i++) {
        hero = context.profile.heroes[i];
        response.write("<h3>" + hero.name + "</h3>");
        response.write("<ul>");
        response.write("<li>Class: " + hero.class + "</li>");
        response.write("<li>Level: " + hero.level + "</li>");
        response.write("<li>Paragon Level: " + hero.paragonLevel + "</li>");
        response.write("</ul>");
    }
    response.write("</body></html>");
}

exports.render = redner;