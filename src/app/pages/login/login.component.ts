import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    imageObject = [{
        image: '../../../assets/pics/navajo_bridge.JPG',
        thumbImage: '../../../assets/pics/navajo_bridge.JPG',
        title: 'Navajo Bridge, Marble Canyon'
    }, {
        image: '../../../assets/pics/forest_gump.jpg',
        thumbImage: '../../../assets/pics/forest_gump.jpg',
        title: 'Mesa Arch Moab, UT'
    }, {
        image: '../../../assets/pics/cliff.jpg',
        thumbImage:  '../../../assets/pics/cliff.jpg',
        title: "Looking over a scary cliff."
    },{
        image: '../../../assets/pics/camelback.jpg',
        thumbImage: '../../../assets/pics/camelback.jpg',
        title: 'Camelback Mountain Phoenix'
    }, {
        image: '../../../assets/pics/red_rocks.jpg',
        thumbImage: '../../../assets/pics/red_rocks.jpg',
        title: 'Red Rocks of Sedona'
    }, {
        image: '../../../assets/pics/goblin_valley.JPG',
        thumbImage: '../../../assets/pics/goblin_valley.JPG',
        title: 'Goblin Valley'
    }];

  constructor() { }

  ngOnInit(): void {
      this.circleText();
  }

  circleText () {


var textCircle = function(el, opt) {
    this.listEl = document.querySelectorAll(el);
    this.arrEl = [].slice.call(this.listEl);
    this.opt = opt;
    this.diameter = this.opt.diameter || 300;
    this.fontSize = this.opt.fontSize || 20;
    this.space = this.opt.space || 6;
    this.elRotate = this.opt.rotate || 'top';
    this.init();
}

textCircle.prototype = {
    
    init: function() {
        var self = this;
        self.arrEl.forEach(function(el) {
            var text = el.innerText;
            var arrText = text.match(/./g);
            
            self.wrapStyle(el);
            self.circle(el, arrText);
        });
    },
    
    rotate: function(el, elRotate, arrChild) {
        var wrapRotate = arrChild[Math.floor(arrChild.length/2)].style.transform;
        if (elRotate == 'top') {
            wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, ''));
        } else if (elRotate == 'bottom') {
            wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, ''))+180;
        } else if (elRotate == 'left') {
            wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, ''))+90;
        } else if (elRotate == 'right') {
            wrapRotate = Number(wrapRotate.replace(/rotate\(|deg\)/g, ''))+270;
        }
        el.style.transform = 'rotate(-' + wrapRotate + 'deg)';  
    },
    
    wrapStyle: function(el) {
        var self = this;
        el.innerHTML = '';
        el.style.position = 'relative';
        el.style.display = 'inline-block';
        el.style.fontSize = self.fontSize + 'px';
        el.style.width = self.diameter + 'px';
        el.style.height = self.diameter + 'px';  
    },
    
    splitText: function(el, arrText) {
        for (var i = 0, len = arrText.length; i < len; i++) {
            if (i === len) break;
            // wrap span text
            el.innerHTML += '<span style="display:inline-block;">' + arrText[i] + '</span>';
        }
    },
    
    circle: function(el, arrText) {
        var self = this;
        function toRadians(angle) {
            return angle * (Math.PI / 180);
        }
        self.splitText(el, arrText);

        var childList = el.children;
        var arrChild = [].slice.call(childList);
        for (var i = 0, len = arrChild.length; i < len; i++) {
            if (i === len) break;

            arrChild[i].style.position = 'absolute';
            arrChild[i].style.textAlign = 'center';
            arrChild[i].style.width = self.fontSize + 'px';
            arrChild[i].style.height = self.fontSize + 'px';

            var x = (self.diameter-self.fontSize)/2*(Math.sin(toRadians(i*self.space)) + 1);
            var y = (self.diameter-self.fontSize)/2*(Math.cos(toRadians(i*self.space)) + 1);
            arrChild[i].style.top = x + 'px';
            arrChild[i].style.left = y + 'px';
            arrChild[i].style.transform = 'rotate(' + (90+(i*self.space)) + 'deg)';

            // rotate center
            self.rotate(el, self.elRotate, arrChild);

        }
    }
}

// Options
// diameter: number
// space: number
// fontSize: number
// rotate: string (top, right, bottom, left)

// Demo 1
var demo1 = new textCircle('.demo1', {
    diameter: 340,
    space: 6,
    fontSize: 28,
});

// Demo 2
var demo2 = new textCircle('.demo2', {
    diameter: 240,
    space: 5,
    fontSize: 16,
    rotate: 'left'
});
  }

}
