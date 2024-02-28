# Drop-Zone
NodeJS Server Documentation
## Upload File
### Description

Upload a file to the Firebase storage.

### Request

- **Method:** `POST`
- **Endpoint:** `/upload`
- **Body:**
  - `file`: File to be uploaded

### Response

- **Status Code:** `200 OK`
  - **Body:** "File Uploaded Successfully"
- **Status Code:** `400 Bad Request`
  - **Body:** "No File Uploaded"
- **Status Code:** `500 Internal Server Error`
  - **Body:** "Error Uploading File"

### Example Usage

```bash
curl -X POST -F "file=@/path/to/your/file.txt" http://your-api-domain/upload
```

## Download File
### Description

Download a file from Firebase storage.

### Request

- **Method:** `GET`
- **Endpoint:** `/download`
- **Query Parameters:**
  - `filename`: Name of the file to be downloaded

### Response

- **Status Code:** `200 OK`
  - **Body:** "File Downloaded Successfully"
- **Status Code:** `400 Bad Request`
  - **Body:** "Filename Is Required"
- **Status Code:** `404 Not Found`
  - **Body:** "File Not Found"
- **Status Code:** `500 Internal Server Error`
  - **Body:** "Error Downloading File"

### Example Usage

```bash
curl http://your-api-domain/download?filename=file.txt -o /path/to/save/file.txt
```

#### Created & Documented By Praabindh Pradeep
#### Dated On ~ 28-02-2024