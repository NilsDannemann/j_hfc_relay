# HFC Relay - Readme

Coming.


# Component Goals
- Better clickable Areas
- Better accessibility (HTML Outliner)
- Intelligent Behavior (responsive, equal height, text-overflow)
- Intelligent Fallbacks (e.g. no image)
- UI Animations

# Creating Pages
1. On Parent: Set Children to true
2. On Children: Implement correct permalink (e.g. /parentpage/childpage)



# Developer Snippets/Includes

##Grid

Use Fraction-based Grid **Columns**
```sass
@include column('1/4');
@include column('1/4', 0); 		//gutters = disabled
@include column('1/4', 10px); 	//gutters = 10px
```

Use Fraction-based Grid **Rows**
```sass
@include row('1/4');
@include row('1/4', 10px); 	//gutters = 10px
@include row('1/4', 0); 	//gutters = disabled
```

##Responsive Rules
Important: Think **Mobile-first**
```sass
.foo {
	width: 10px;

	@include respond-to(x-small) { 
		width: 20px 
	}
	@include respond-to(small) { 
		width: 30px 
	}
	@include respond-to(medium) { 
		width: 40px 
	}
	@include respond-to(large) { 
		width: 50px 
	}
	@include respond-to(x-large) { 
		width: 60px 
	}
}
```


##Flexbox 

Use Flexbox with Fallback:
Default: row
```sass
@include flexbox($direction);
```


Specify Flexbox width:
Default: 50%
```sass
@include flexbox-width($width);
```


Specify Flexbox order:
Default: 1 up
```sass
@include flexbox-order($order);
```


