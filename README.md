# HFC Relay - Readme

In progress.

Features: 
- No Plugins
- CSS: Fraction-based Grid
- CSS: Responsive Snippets
- CSS: Snippets & Helpers
- Automatic Breadcrumb
- Generated Navigation
- Slider
- Buttons & Button Groups (need work)
- Sublime Snippets



# The Navigation
The Navigation is responsive out of the box.

###Adding a Page
- Create your ```page.md``` in the _pages folder

- Add Front Matter
```
---
title: "page"
permalink: "/page/"
layout: sidebar_double
position: 2
children: false
---
```
Done!

###Adding a Sub-Page
- Create your ```my_subpage.md``` in the _pages folder 
<br> **Note:** you can also place it in a sub-folder for better organisation.

- Add Front Matter
<br> **Note:** The permalink controls the sub-nav
```
---
title: "my_subpage"
permalink: "/page/my_subpage"
layout: sidebar_double
position: 2
children: false
---
```
- Finally go back to the **parent page** (here: ```page.md```) and set ```children: true```



# The Slider
Based on the [Swiper Slider](http://www.idangero.us/swiper/). 
Full API [here](http://www.idangero.us/swiper/api/), Demos [here](http://www.idangero.us/swiper/demos/)<br>

###Usage
- Place the include in one of your pages or layouts:
```sass
{% include components_base/slider/slider.html arrows="light" pagination="light" %}
// arrows & pagination can be set to "light", "dark" or "none".
```

- To add/remove images just place them in this folder:
```
assets/images/slider
```

- Change Slider-Settings here:
```
/_includes/components_base/slider/slider.js
```
Done!




# The Grid
The Grid uses flexible sass-mixins instead of fixed classes.<br>

This approach has the following advantages over conventional grids:<br>

- **Flexibility** - just pass any ```$fraction``` and ```$gutter``` you like
- **Cleanliness** - keep your Markup clean and readable
- **Simplicity** - keep all styles in one place (no separation of concerns)

###Requirements
- Global Border Box (comes with the config.scss)
- Flexbox (use ```@include flexbox();``` on containing element)

###Examples

```sass
@include column('1/4');
@include column('2/9');
@include column('14/23');
```

###Adding Gutters

By default a column has no gutters. You can add gutters like so:

```sass
@include column('1/4', $gutter: true); 		// adds global gutters (use: 'true' or 'basic')
@include column('1/4', true); 				// shorthand 
```
**Note:** This uses the global ```$whitespace``` variable for gutters.

You can also specify your own gutters like so:
```sass
@include column('1/4', $gutter: 10px); 		// adds px gutters
@include column('1/4', $gutter: 2em); 		// adds em gutters
@include column('1/4', $gutter: 3%); 		// adds % gutters
@include column('1/4', $gutter: $var); 		// you can also use sass-variables
@include column('1/4', $gutter: $var/2); 	// you can even do math with them
```

###Play with it
You can test the mixin over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Grid-Playground](http://codepen.io/NilsDannemann/pen/NGwmqq?editors=110)




#Responsive Mixins
Four sets of sass-mixins let you control the responsive flow of your document:

- **Above** a certain breakpoint (``` @include respond-above(breakpoint-name) { ... } ```)
- **Below** a certain breakpoint (``` @include respond-below(breakpoint-name) { ... } ```)
- **At** a certain breakpoint (``` @include respond-at(breakpoint-name) { ... } ```)
- **From** a certain breakpoint (``` @include respond-from(breakpoint-name, breakpoint-name) { ... } ```)

You can also pass any px value instead of a breakpoint-name,

###Examples

**Above** a certain breakpoint (mobile-first)
```sass
.foo {
	//styles
	@include respond-above(xs) { ... }				// accpets breakpoint-names: xs, s, m, l, xl, xxl
	@include respond-above(500px) { ... }			// or specific px value
}
```

**Below** a certain breakpoint (desktop-first)
```sass
.foo {
	//styles
	@include respond-below(xs) { ... }				// accpets breakpoint-names: xs, s, m, l, xl, xxl
	@include respond-below(500px) { ... }			// or specific px value
}
```

**At** a certain breakpoint<br>
```sass
.foo {
	//styles
	@include respond-at(xs) { ... }					// accepts breakpoint-names: xs, s, m, l, xl, xxl
	@include respond-at(500px) { ... }				// or specific px value
}
```

**Between** two breakpoints<br>
```sass
.foo {
	//styles
	@include respond-between(xs, m) { ... }			// accepts breakpoint-names: xs, s, m, l, xl, xxl
	@include respond-between(500px, 900px) { ... }	// or two specific px values
}
```

###Usage
You can use the breakpoint-mixins in two ways:

Either inside your class-declarations...
```sass
.foo {
	color: red
	@include respond-above(l) { color: blue }
}
```

... or on their own.
```sass
.foo {color: red}
@include respond-above(l) { 
	.foo { color: red }
}
```
Both is fine.

###Play with it
You can test the mixin over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Breakpoint-Playground](http://codepen.io/NilsDannemann/pen/gaoZrE?editors=110)




# Position Shorthand
Use position relative, absolute or fixed in shorthand.<br>

###Examples

```sass
// shorthand
@include position(relative, 10px, 0, 0, 0);

// returns
position: relative;
top: 10px;
right: 0;
bottom: 0;
left: 0;
```

###Play with it
You can test the mixin over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Grid-Playground](http://codepen.io/NilsDannemann/pen/XXajGM?editors=110)



# Arrows
Use css-arrows via sass-mixins.<br>

###Examples

```sass
// centered up-arrow
@include arrow(); 
// right-aligned down-arrow
@include arrow($direction: down, $align: right);
// top-aligned left-arrow with specific color & size
@include arrow($direction: left, $align: top, $color: #eee, $size: 10px);
```

###Play with it
You can test the mixin over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Grid-Playground](http://codepen.io/NilsDannemann/pen/xZLEWd?editors=110)




# Quantity Query Mixin
Change styles based on the quantity of Elements.<br>

###Examples

```sass
@include quantity-at(4) {...} 			// styles when exactly 4 elements
@include quantity-above(4) {...} 		// styles when more than 4 elements
@include quantity-below(4) {...} 		// styles when less than 4 elements
@include quantity-between(2,4) {...} 	// styles between 2 and 4 elements
```

###Play with it
You can test the mixin over here:<br>
![alt tag](https://dl.dropboxusercontent.com/u/7534528/HFC/code-playground.png)
[Open Breakpoint-Playground](http://codepen.io/NilsDannemann/pen/LGjRXe?editors=110)




#Components & Parts

### Base Components

### HFC Components

### Parts
Parts can be used for building your own components.

##### Button
Optional: Define a **title**, a **link**, a **style** and/or a **color**.
- Style: can be "filled", "outlined" or "none". Default: "filled".
- Color: can be "brand" or any of the color variables. Default: "grey".
```Sass
//without variables
{% include components/button/button.html %}
//width variables
{% include components/button/button.html title="MyTitle" link="link" style="filled" color="brand" %}
```
##### Buttongroup
Optional: Define a **style** and/or a **color**.
- Style: can be "filled", "outlined" or "none". Default: "filled".
- Color: can be "brand" or any of the color variables. Default: "grey".
```Sass
//without variables
{% include components/button/buttongroup.html %}
//width variables
{% include components/button/buttongroup.html style="filled" color="brand" %}
```



#Other (in progress)

###Container
**Basic Container**
```sass
@include container();
```

###Flexbox 
**Use Flexbox**
```sass
@include flexbox();
```
