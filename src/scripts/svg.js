import Engine from './engine';

window.cancelRequestAnimFrame = (() => {
	return window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout;
})();

class SvgEngine extends Engine {
	constructor() {
		super();
		this.canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.canvas.style.display = 'block';
		this.canvas.style.width = this.width;
		this.canvas.style.height = this.height;
		this.content.appendChild(this.canvas);
	}

	init() {
	}

	requestAnimFrame() {
		const rects = this.rects;
		for (let i = 0; i < rects.length; i++) {
			const r = rects[i];
			r.x -= r.speed;
			if (r.x + r.size < 0) {
				r.x = this.width + r.size;
			}
            r.el.setAttribute('x', r.x);
		}
		this.meter.tick();

		window.requestAnimationFrame(() => {
			this.requestAnimFrame()
		});
	}

	render() {

		// rectangle creation
		const rects = new Array(this.count.value);
        for (let i = 0; i < this.count.value; i++) {
			const x = Math.random() * this.width;
			const y = Math.random() * this.height;
			const size = 10 + Math.random() * 40;
			const speed = 1 + Math.random();
            const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            el.setAttribute('x', x);
            el.setAttribute('y', y);
            el.setAttribute('width', size);
            el.setAttribute('height', size);
            el.setAttribute('fill', '#fff');
            el.setAttribute('stroke', '#000');
			rects[i] = { x, y, size, speed, el };
            this.canvas.appendChild(el);
		}
        this.rects = rects;
        this.requestAnimFrame()
	};
}

document.addEventListener('DOMContentLoaded', async () => {
	const engine = new SvgEngine();
	engine.init();
	engine.render();
});
