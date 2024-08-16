# GTFORM

## Overview

This project is a web application primarily built with Angular and includes a small .NET 8 C# backend. The application features custom UI
components designed to resemble the classic Windows Forms aesthetic. The key components developed in this project include various input
elements, select dropdowns, checkboxes, a fully custom table, and reusable templates.

## Install

```bash
npm install gtform@latest
```

## Config

angular.json

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "node_modules/gtform/lib/i18n",
      "output": "/assets/gtform/i18n"
    }
  ]
}

```

add ngx-translate module

```json
{
  "dependencies": {
    "@ngx-translate/core": "^15.0.0",
    "@ngx-translate/http-loader": "^8.0.0"
  }
}
```

import module

```typescript
@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (gtformTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    GtformModule.forRoot({
      defaultLang: 'en',
      defaultTheme: 'light'
    })
  ],
})
export class AppModule {
}
````

## Style

```scss

@import "gtform/lib/styles/global.scss";
```

## New Theme

By default its comes with light and dark theme. If you want to add new theme you can add it in the style.scss file.

```scss
style.scss

`
`
`
scss
[data-theme="custom"] {
  --primary-color: #ff0000;
  --secondary-color: #ffc107;
  --accent-color: #e91e63;
  --background-color: #f4f4f4;
  --text-color: #212121;
  --text-color-secondary: #f4f4f4;
  --error-color: #f44336;
  --success-color: #4caf50;
  --warning-color: #ffeb3b;


  --header-background-color: #003e55;
  --header-background-img: linear-gradient(to bottom, #005f7f 0%, #003e55 100%);
  --header-border-color: #e5e8ea;
  --header-menu-item-color: #fff;

  --main-content-background-color: #ffffff;
  --main-content-text-color: #231f20;

  --form-control-disabled-background-color: #e6e6e6;
  --form-control-disabled-color: #9e9e9e;

  --form-chips-background: #e8e8e8;

  --form-back-ground-color: #fff;
  --form-separetor-line-color: #181818;
  --form-border-color: #b4b4b4; //var(--form-border-color);
  --form-control-active-color: #007bff;
  --form-header-control-background-img: linear-gradient(to bottom, #e8e8e8 0, #e8e8e8 100%);
  --form-header-control-color: #231f20;
  --form-header-control-active-background-img: linear-gradient(to bottom, #c9c9c9 0, #c9c9c9 100%);
  --form-header-control-active-color: #231f20;

}
```

To change the theme you can use the below code.

```typescript
export class MyComponent {
  public constructor(private themeService: GtformThemeService) {
  }

  public setCustomTheme(): void {
    this.themeService.setTheme('custom');

  }
}
```

