import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentType } from './student.type';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private lessonService: StudentService) {}
  @Query(returns => StudentType)
  student(@Args('id') id: string) {
    return this.lessonService.getStudent(id);
  }

  @Query(returns => [StudentType])
  students() {
    return this.lessonService.getStudents();
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createLessonInput: CreateStudentInput,
  ) {
    return this.lessonService.createStudent(createLessonInput);
  }
}
