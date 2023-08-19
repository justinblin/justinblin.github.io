//to make multiple slideshows, one method makes a global slide index matrix with the current slideshow on the outside
//and the current slide of that slideshow on the inside

/*i can also make a constructor that makes a slideshow object, then make the make slideshwos in the script section of each html page, that way i can have
an external slideshowJS that works with each page only needing a bit of JS to create each slideshow object*/

//weirdly, the slides work by directly changing the CSS of "active" slides with JS
//whereas the dots work by indirectly changing the CSS by adding and removing classes with JS

//OBJECT CONSTRUCTOR METHOD TO CREATE MULTIPLE SLIDESHOWS

/*****IMPORTANT*****/

//TO USE, CREATE AN INSTANCE/INSTANCES OF SLIDESHOWS USING THE CONSTRUCTOR IN THE SCRIPT SECTION OF THE HTML PAGE
/*EX: var slideshowZero = new Slideshow(0);
OR var slideshowOne = new Slideshow(1);*/

var Slideshow = function(slideshowNumber) {//slideshow object constructor
    this.slideshowNumber = slideshowNumber;//the "ID number" of the slideshow
    this.slides = document.getElementsByClassName("slides-" + slideshowNumber);//collection of elements with the slides-x class
    this.dots = document.getElementsByClassName("dots-" + slideshowNumber);//collection of elements with the dots-x class
    this.currentSlideIndex = 0;//current slide index

    this.showSlides(0);//makes the first slide visible when creating a new slideshow
}
Slideshow.prototype.showSlides = function(intendedSlideIndex) {//object method to show slides of a given slideshow
    //make sure the slide doesn't go past the boundaries
    if (intendedSlideIndex >= this.slides.length) {
        intendedSlideIndex = 0;
            }
    else if (intendedSlideIndex < 0) {
         intendedSlideIndex = this.slides.length-1;
    }

    //makes the old slide invisible and the new slide visible
    this.slides[this.currentSlideIndex].style.display = "none";
    this.slides[intendedSlideIndex].style.display = "block";

    //makes the dot of the current slide darker
    if (this.dots.length != 0) {//allows me to use the slideshow without dots if I want
        //using a direct CSS style edit w/ JS instead of the weird indirect adding/subtracting classes w/ the CSS traits
        this.dots[this.currentSlideIndex].style.backgroundColor = "rgba(0,0,0,0.5)";
        this.dots[intendedSlideIndex].style.backgroundColor = "rgba(0,0,0,0.8)";
    }

    //updates the current slide index to the next intended slide
    this.currentSlideIndex = intendedSlideIndex;
}
Slideshow.prototype.changeSlidesWithArrows = function(intendedChange) {//object method to change the slides using the arrow buttons
    intendedSlideIndex = this.currentSlideIndex + intendedChange;
    this.showSlides(intendedSlideIndex);//"this" keyword allows you to call object methods inside the object or another object method
}