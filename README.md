# URL Summary API

This API takes a website URL as input and uses the OpenAI API to generate a summary of the URL's contents.

## Prerequisites

- Node.js
- npm
- MongoDB
- OpenAI API Key

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_USERNAME/url-summary-api.git
   cd url-summary-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   PORT=3000
   MONGODB_URI=<Your MongoDB URI>
   OPENAI_API_KEY=<Your OpenAI API Key>
   ```

4. Start the server:
   ```sh
   node src/index.js
   ```

## Usage

### Summarize URL

Endpoint: `/summarize`

Method: `POST`

Content-Type: `application/json`

#### Request Body

```json
{
  "url": "https://example.com"
}
```

#### Sample Request

```sh
curl -X POST https://gvlisxl.srv.hanuman.build/summarize \
-H "Content-Type: application/json" \
-d '{"url": "https://example.com"}'
```

#### Sample Response

```json
{
  "summary": "This is a summary of the content from the provided URL."
}
```

### Example

```sh
curl -X POST https://gvlisxl.srv.hanuman.build/summarize \
-H "Content-Type: application/json" \
-d '{"url": "https://www.wikipedia.org/"}'
```

Response:
```json
{
  "summary": "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation."
}
```

## License

This project is licensed under the MIT License.
