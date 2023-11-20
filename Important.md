Certainly! Here's the combined markdown file with all the information:

# Chat Application

## Project Status

- **Type 1:** Work in Progress
  - Features: GroupChat, AudioCall, VideoCall, Chatbot
  - Status: In development

- **Type 2:** Fully Functional
  - Features: Login, Logout, Register, Individual Chatting realtime
  - Status: Complete

- **Type 3:** Almost done
  - Features: Realtime groupchat, individual chat
  - Requirement: node version < 20

## How to Run Type 2

1. Navigate to the server directory:
   ```bash
   cd server


2. Create a `.env` file inside server directory with the following content:
   ```env
   MONGODB_URI=[Your MongoDB URI]
   PORT=[Your preferred port number]
   ```

3. Open a new terminal, navigate to the front end directory:
   ```bash
   cd frontend
   ```

4. Install dependencies for the frontend:
   ```bash
   yarn
   ```

5. Install dependencies for the server:
   ```bash
   cd ../server
   yarn
   ```

6. Start the server:
   ```bash
   yarn start
   ```

7. Open another terminal, start the frontend:
   ```bash
   cd ../frontend
   yarn start
   ```

8. Access the web app in your browser.

## Result and Notice

- In the three types, only Type 2 is fully functional. Type 1 is a work in progress, which includes all features such as GroupChat, AudioCall, VideoCall, and Chatbot.

## Note

Make sure to replace `[Your MongoDB URI]` and `[Your preferred port number]` with your actual MongoDB URI and preferred port number in the `.env` file.

Feel free to check the respective directories for more specific instructions on running each type.

Happy chatting!
```

Remember to replace placeholders like `[Your MongoDB URI]` with your actual MongoDB URI. This consolidated markdown file provides a comprehensive guide for your Chat Application.
