export class Item {
    // Initialize DOM and style related properties
    // Various elements within this item
    DOM = {
        // Main DOM element
        el: null,
        // .title-wrap element
        titleWrap: null,
        // .title--up
        titleUp: null,
        // .title--down
        titleDown: null,
        // .content elements
        content: null,
        // svg element
        svg: null,
        // This is the mask element, it can be either a circle or a path SVG element.
        // We will be animating the 'radius' attribute for circle or the 'd' attribute for path.
        mask: null,
        // image element
        image: null,
    };
    // flipstate saves the current state of title elements
    flipstate = null;
    
    /**
     * Sets up the necessary elements and data for an Item instance.
     * @param {HTMLElement} DOM_el - The DOM element that represents the item.
     */
    constructor(DOM_el) {
        // Assign DOM elements
        this.DOM.el = DOM_el;
        this.DOM.titleWrap = this.DOM.el.querySelector('.title-wrap');
        this.DOM.titleUp = this.DOM.titleWrap.querySelector('.title--up');
        this.DOM.titleDown = this.DOM.titleWrap.querySelector('.title--down');
        this.DOM.content = [...this.DOM.el.querySelectorAll('.content')];
        this.DOM.svg = this.DOM.el.querySelector('.content__img');
        this.DOM.mask = this.DOM.svg.querySelector('.mask');
        this.DOM.image = this.DOM.svg.querySelector('image');
        
        // Save current state
        this.flipstate = Flip.getState([this.DOM.titleUp, this.DOM.titleDown]);
        
        // Change layout
        this.DOM.content[1].prepend(this.DOM.titleUp, this.DOM.titleDown);
        
        // Check if the mask element is a circle or a path
        const isCircle = this.DOM.mask.tagName.toLowerCase() === 'circle';

        // Create the Flip.from that we'll pass into the ScrollTrigger animation property
        const flip = Flip.from(this.flipstate, {
            ease: 'none',
            simple: true
        })
        .fromTo(this.DOM.mask, {
            attr: isCircle ? {r: this.DOM.mask.getAttribute('r')} : {d: this.DOM.mask.getAttribute('d')},
        }, {
            ease: 'none',
            attr: isCircle ? {r: this.DOM.mask.dataset.valueFinal} : {d: this.DOM.mask.dataset.valueFinal},
        }, 0)
        // Also scale up the image element
        .fromTo(this.DOM.image, {
            transformOrigin: '50% 50%',
            filter: 'brightness(100%)'
        }, {
            ease: 'none',
            scale: isCircle ? 1.2 : 1,
            filter: 'brightness(150%)'
        }, 0);
        

        ScrollTrigger.create({
            trigger: this.DOM.titleWrap,
            ease: 'none',
            start: 'clamp(top bottom-=10%)',
            end: '+=40%',
            scrub: true,
            animation: flip,
        });
    }
}