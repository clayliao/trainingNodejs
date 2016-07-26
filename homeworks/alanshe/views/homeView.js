"use strict";

function render(request, response, context) {
    response.write(
        "<html><body><h3>Welcome</h3><a href='showHero?battletag=VolcanicAsh-1508'>Show Diablo characters</a></body></html>"
    );
}

exports.render = render;