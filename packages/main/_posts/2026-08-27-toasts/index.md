---
title: "Toasts Are Harder Than They Look"
tags: [accessibility, "user interface", frontend]
---

Accessibility problems usually have recognizable solutions. A button needs an accessible name, text needs sufficient contrast, and a modal needs sensible focus management.

The implementation may be wrong, but the path toward fixing it is usually understood.

Then there are toasts.

<!-- truncate -->

## What is a Toast

A toast is a small, temporary message that appears in response to an event or user action. It might confirm success, report an error, or tell the user that an asynchronous operation has completed.

In Gmail, when you delete an email, the user is given a toast notification that allows the user to undo the action.

In some systems, an action is asynchronous, and a toast is used to notify the user after the action has completed without blocking the user on a screen/form to wait for the result.

## Why toasts are difficult

Dialogs have `<dialog>`. Buttons have `<button>`. Forms have `<form>`, `<input>`, and `<label>`. Toasts have… `<div>`.

For example, here is an HTML-only modal example:

```
 <dialog id="hello_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
  </div>
</dialog>
```

Native elements provide browsers and assistive technologies with semantics they already understand.

The main issue is that there doesn’t exist any basic HTML element that perfectly encompasses a toast. Any implementation of a toast ends up being a custom implementation for whatever system implements it.

Then there is the large amount of usability issues:

- On large screens, toasts end up going unnoticed.
- On any page with visual clutter - for example a page with a map on it that contains map controls for zooming, searching, etc - a toast can often be lost in the visual clutter.
- A toast is often distracting. If the toast automatically dismisses itself, then the user only has a short period of time to read or interact with the message. If the toast does not automatically dismiss, it distracts the user from their flow by requiring them to dismiss it.
- If a user is using any screen magnification software, the toast can go unnoticed since it might be outside of the magnification window.
- A toast appearing is typically disconnected from the action that was taken, meaning the user may not understand the relationship between the toast and action that triggered it.

## What do we do about it?

The next question is of course: so what do we do about it? Can we make toasts accessible for users? Primer - the component library created by GitHub - has decided that [toasts were not worth the effort](https://primer.style/accessibility/patterns/accessible-notifications-and-messages/):

> Toasts pose significant accessibility concerns and are not recommended for use.

The accessibility problem with toasts isn't merely that screen readers can't announce them. It's that the entire interaction model assumes the user will notice a temporary piece of UI appearing somewhere else on the screen. 

For simple actions, the Primer documentation suggests to simply have a banner on the next page after a form submission with any additional information for successful states. The user successfully created an issue? Redirect to the issue. Need to provide feedback after a complex action? Use a banner at the top of the resulting page with the message.

There are also many discussions on YCombinator, such as [this one](https://news.ycombinator.com/item?id=46135145) where users argue about how useful toasts really are.

> Toasts are a great way to lose information.


On Couchsurfing, we had a similar experience with toasts. We implemented toasts to alert the user that they needed to turn on Geolocation permissions to use certain features. We rendered the toast correctly, it had sufficient contrast, and assistive technology would announce it properly. None of that mattered though because users simply wouldn’t notice it. Toasts would get lost in the clutter of controls on our pages with maps on them.

But if a toast is really required, the package [Sonner](https://github.com/emilkowalski/sonner) offers a Toast implementation that is as accessibility friendly as it can be. Emil Kowalski, a design engineer, created the Sonner toast library and wrote a [nice blog post here](https://emilkowal.ski/ui/building-a-toast-component) that describes the animation and API of the implementation, but the real important part of the toast implementation is how it renders the toasts, which roughly looks like:

```html
<section
  aria-label={ariaLabel}
  tabIndex={-1}
  aria-live="polite"
  aria-atomic="false"
>
  <ol tabIndex={-1}>
    <li tabIndex={0}>
	    {content}
    </li>
  </ol>
</section>
```

Each section helps with accessibility as follows:

- `aria-label` provides screen readers with an accessible name for the section
- `tabIndex={-1}` takes the section out of the keyboard navigation flow
- `aria-live="polite"` means that any changes within this node will wait to alert the user until their current action is complete
- `aria-atomic="false"` means that assistive technology will only announce the changed portion of the region, rather than presenting the entire region again.

Another implementation that is very accessibility aware is the [React Aria library](https://react-aria.adobe.com/Toast/useToast), which creates markup similar to:

```html
<div
	role="region"
	tabindex="-1"
	aria-label="1 notification."
>
	<div
		role="alertdialog"
		aria-modal="false"
		aria-labelledby="title"
		tabindex="0"
	>
		<div
			role="alert"
			aria-atomic="true"
		>
			<div
				id="title"
				slot="title"
			>
				Toast is done!
			</div>
		</div>
	</div>
</div>
```

Which as we can see is slightly different than the Sonner implementation. Mainly that no section is used, but the div is marked a `region`. It also uses the role `alertdialog` .

## Did we solve it?

Just looking at two implementations shows the problem with toasts - because they aren’t standardized into HTML, every implementation looks slightly different. In the end, that means that if we care about accessibility, we are mainly working around the constraints of HTML to provide a semantic and understandable toast component. And, even if we do implement a toast that is good enough, we still have to worry about the user experience of interacting with a toast.

The two implementations also didn’t answer some of the main UX concerns when using toasts: did the user even see the toast? Did it disappear before they finished reading it? Did the user even understand the message, let alone which action caused it?

There are plenty of sites that use toasts though. My early example was Gmail, and that is used by millions of people around the world. Even Apple uses toasts. What is a notification on the Mac desktop if not a toast? We also have mobile notifications on Android and iOS devices that are basically toasts for different apps to get your attention.

Toasts have their place, but they require considerably more thought than their simple UI suggests. The next time you reach for one, ask your team: is there a better way to convey the same information?