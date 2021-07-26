const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    // Test 1: Creating a new thread: POST request to /api/threads/{board}
    // Test 2: Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
    // Test 3: Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
    // Test 4: Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
    // Test 5: Reporting a thread: PUT request to /api/threads/{board}
    // Test 6: Creating a new reply: POST request to /api/replies/{board}
    // Test 7: Viewing a single thread with all replies: GET request to /api/replies/{board}
    // Test 8: Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
    // Test 9: Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
    // Test 10: Reporting a reply: PUT request to /api/replies/{board}

});
