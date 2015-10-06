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

**Use Columns**
```sass
@include column('1/4');
@include column('1/4', 0); 		//gutters = disabled
@include column('1/4', 10px); 	//gutters = 10px
```

**Use Rows**
```sass
@include row('1/4');
@include row('1/4', 10px); 	//gutters = 10px
@include row('1/4', 0); 	//gutters = disabled
```

##Responsive Rules
Think **mobile-first**
```sass
.foo {
	//styles

	@include respond-to(x-small) { 
		//styles above x-small
	}
	@include respond-to(small) { 
		//styles above small
	}
	@include respond-to(medium) { 
		//styles above medium
	}
	@include respond-to(large) { 
		//styles above large
	}
	@include respond-to(x-large) { 
		//styles above x-large
	}
}
```


##Flexbox 

**Use Flexbox** (with Fallback):
Default: flex, row
```sass
@include flexbox($type, $direction);
```


**Flexbox width**:
Default: 50%
```sass
@include flexbox-width($width);
```


Specify Flexbox order:
Default: 1 up
```sass
@include flexbox-order($order);
```


