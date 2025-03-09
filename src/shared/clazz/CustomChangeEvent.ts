import {ChangeEvent} from "react";

export class CustomChangeEvent implements ChangeEvent<HTMLInputElement> {
	bubbles: boolean;
	cancelable: boolean;
	currentTarget: EventTarget & HTMLInputElement;
	defaultPrevented: boolean;
	eventPhase: number;
	isTrusted: boolean;
	nativeEvent: Event;
	target: EventTarget & HTMLInputElement;
	timeStamp: number;
	type: string;

	constructor(target: HTMLInputElement, value: string) {
		this.bubbles = true;
		this.cancelable = true;
		this.currentTarget = target;
		this.defaultPrevented = false;
		this.eventPhase = 0;
		this.isTrusted = true;
		this.nativeEvent = new Event('change');
		this.target = target;
		this.timeStamp = Date.now();
		this.type = 'change';

		this.target.value = value;
	}

	isDefaultPrevented() {
		return false;
	}

	isPropagationStopped() {
		return false;
	}

	persist() {
		// No-op
	}

	preventDefault() {
		// No-op
	}

	stopPropagation() {
		// No-op
	}
}
