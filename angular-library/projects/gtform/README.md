#Dev local

Add this to angular.json in external consuming application to use npm link.

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "preserveSymlinks": true
          }
        },
        "serve": {
          "options": {
            "preserveSymlinks": true
          }
        }
      }
    }
  }
}

```
