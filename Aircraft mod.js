elements.fighter_jet_left = {
    color: "#bcc6cc",
    behavior: [
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
        "M1 AND CR:fast_bullet_left|XX|CR:smoke AND EX:5>metal_scrap",
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
    ],
    tick: function(pixel) {
        // Check for walls on the left side
        var wallOnLeft = !isEmpty(pixel.x - 1, pixel.y, true);

        // Calculate the distance from the wall
        var distanceFromWall = 0;
        for (var i = 1; i <= 15; i++) {
            if (!isEmpty(pixel.x - i, pixel.y, true)) {
                distanceFromWall = i;
                break;
            }
        }

        // If the jet is less than 15 pixels away from the wall, turn around
        if (distanceFromWall <= 15) {
            wallOnLeft = !wallOnLeft; // Reverse direction
        }

        // Move according to the direction
        if (wallOnLeft) {
            tryMove(pixel, pixel.x - 1, pixel.y); // Move left
        } else {
            tryMove(pixel, pixel.x + 1, pixel.y); // Move right
        }

        // Check for collision after movement
        if (!tryMove(pixel, pixel.x, pixel.y)) {
            var newPixel = pixelMap[pixel.x][pixel.y];
            if (newPixel.element === "fast_bullet_left") {
                break;
            }
            if (elements[newPixel.element].state == "solid") {
                if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                    if (elements[newPixel.element].breakInto) {
                        breakPixel(newPixel);
                    } else {
                        deletePixel(newPixel.x, newPixel.y);
                    }
                }
            }
            // Delete the current pixel if collision
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "aircrafts",
    breakInto: "metal_scrap"
};
