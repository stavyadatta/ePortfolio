import gsap from "gsap";

function animateComponents(event, compClassOne, compClassTwo, durationOne, durationTwo) {
	event.preventDefault();
	const active = {opacity: 1, display: "block", duration: durationOne}; 
	const inactive = {opacity: 0, display: "none", duration: durationTwo};
	const compOne = document.getElementsByClassName(compClassOne);
	const compTwo = document.getElementsByClassName(compClassTwo);

	let tl = gsap.timeline();
	tl.fromTo(compOne, active, inactive);
	tl.fromTo(compTwo, inactive, active);
}

export default animateComponents;