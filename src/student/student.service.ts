import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InputType, Field } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    let student = this.studentRepository.create({
      id: uuidv4(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
}
