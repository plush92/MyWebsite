import { Request, Response } from 'express';
import * as userModel from '../models/userModel';

// Create a new user
export async function createUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    const newUser = await userModel.insertUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// Get all users
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// (Optional) Get a single user by ID
export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(Number(id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// (Optional) Delete a user by ID
export async function deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userModel.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }