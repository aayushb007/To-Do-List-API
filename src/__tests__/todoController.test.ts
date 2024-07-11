import request from "supertest";
import app from "../index";

describe("To-Do API", () => {
  let token: string;
  beforeAll(async () => {
    // Sign up and log in a user to get a token
    await request(app).post("/api/signup").send({
      username: "testuser",
      password: "testpassword",
    });

    const res = await request(app).post("/api/login").send({
      username: "testuser",
      password: "testpassword",
    });

    token = res.body.token;
  });
  // Test Case : To Do creation
  it("should create a new to-do item", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test To-Do",
        description: "This is a test to-do item.",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test To-Do");
  });
  // Test Case : Get All To-Do Items
  it("should retrieve all to-do items", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
 // Test Case : Edit Todo Item
  it("should update a to-do item", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Another Test To-Do",
        description: "This is another test to-do item.",
      });

    const todoId = createRes.body._id;

    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated To-Do",
        description: "This is an updated test to-do item.",
        completed: true,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated To-Do");
  });
  // Test Case: Delete Todo Item
  it("should delete a to-do item", async () => {
    const createRes = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "To-Delete To-Do",
        description: "This to-do item will be deleted.",
      });

    const todoId = createRes.body._id;

    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "To-do deleted successfully");
  });
});
