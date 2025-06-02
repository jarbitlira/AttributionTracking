## Project Overview

This project is a Node.js application using nestJS and GraphQL to manage conversions attributed to Google Analytics 4 (
GA4) event data. It integrates with MongoDB for data storage and uses the GA4 Data API to fetch event data.

It allows users to create conversions, which are then attributed to the last-click source based on GA4 event data.

## Setup Instructions

### 1. MongoDB Atlas (Free Tier)

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a free account and a new project.
- Build a new cluster (choose the free tier).
- Create a database user and whitelist your IP.
- Get your connection string and update your `.env` file:
  ```
  MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
  ```

### 2. GA4 Property & Data API

- Create a Google Analytics 4 property in the [Google Analytics Console](https://analytics.google.com/).
- Register a project in [Google Cloud Console](https://console.cloud.google.com/).
- Enable the "Google Analytics Data API" for your project.
- Create OAuth credentials and/or a service account.
- Download the credentials JSON and add to your `.env`:
  ```
  GA4_CREDENTIALS=<your-oauth-json>
  GA4_SERVICE_ACCOUNT_CREDENTIALS=<your-service-account-json>
  ```
- Set your GA4 property ID in the `.env` file:
  ```
    GA4_PROPERTY_ID=<your-ga4-property-id>
  ```

### 3. Node.js Dependencies

- Install dependencies:
  ```
  pnpm install
  ```

### 4. Environment Variables

- Copy `.env.example` to `.env` and fill in all required values (see above).

### 5. Run the Application

- Start the application:
  ```
  pnpm start
  ```

---

## Example Queries

### Create Conversion Mutation

**GraphQL Mutation:**

```graphql
mutation createConversion($conversion: ConversionInput!) {
    createConversion(conversion: $conversion) {
        id
        userId
        emailHash
        conversionType
        conversionValue
        attributedSource
        attributedCampaign
        timestamp
    }
}
```

**Variables**

```
{
    "conversion": {
        "userId": "12345",
        "email": "random@email.com",
        "conversionType": "purchase",
        "conversionValue": 100,
        "attributedSource": "google",
        "attributedCampaign": "spring_sale"
    }
}
```

**Expected Response:**

```json
{
  "data": {
    "createConversion": {
      "id": "665f1c...",
      "userId": "12345",
      "conversionValue": 100,
      "conversionType": "purchase",
      "attributedSource": "google",
      "attributedCampaign": "spring_sale",
      "timestamp": "2024-06-01T12:00:00.000Z",
      "emailHash": "e3b0c44298fc1fb924..."
    }
  }
}
```

---

## GA4 Integration Details

- **Data API Configuration:**
    - Enable the GA4 Data API in Google Cloud.
    - Create a service account credentials for API access.

- **GA4 Property Setup:**
    - Set up a GA4 property and link it to your website/app. Ensure events are being sent to GA4.
    - Add permissions for the service account to access the GA4 property.

- **Event Data Retrieval:**  
  The backend fetches raw event data from GA4 using the Data API. This data is used for attribution and analytics.

---

## Attribution Logic

When a conversion is created, it queries the GA4Event collection for the most recent
event associated with the user and attributes the conversion to that source.

The backend matches conversion events to the latest relevant GA4 event using the userId and timestamp.

---

## Sample Data Usage

- The first time the project runs, it will populate the database with sample conversion data.

---

## Assumptions

- Email addresses are only used for hashing and are not stored in the database.
- All environment variables are set correctly before running the app.
- You have a basic understanding of GraphQL and NestJS.
- You have created a Google Cloud project and enabled the GA4 Data API.

---
