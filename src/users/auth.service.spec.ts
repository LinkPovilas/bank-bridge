import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Role } from '../common/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  const testUser: CreateUserDto = {
    email: 'test@test.eu',
    username: 'test',
    password: 't35t',
  };

  beforeEach(async () => {
    mockUsersService = {
      findOne: jest.fn((options: FindOneOptions<User>) =>
        Promise.resolve({
          id: Math.floor(Math.random() * 999999),
          email: 'test@test.eu',
          username: options.where['username'],
          password: 't35t',
          role: Role.SERVICE,
          approved: false,
        }),
      ),
      create: jest.fn((createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: Math.floor(Math.random() * 999999),
          ...createUserDto,
          role: Role.SERVICE,
          approved: false,
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      jest
        .spyOn(mockUsersService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));

      const user = await service.register(testUser);

      expect(mockUsersService.findOne).toHaveBeenCalled();
      expect(mockUsersService.create).toHaveBeenCalled();

      expect(user).toBeDefined();
      expect(user).toMatchSnapshot({
        id: expect.any(Number),
        password: expect.any(String),
      });

      expect(user.password).not.toBe(testUser.password);
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('should throw an error if user already exists', async () => {
      await expect(service.register(testUser)).rejects.toThrow();
    });
  });

  describe('validateUser', () => {
    let registeredUser: User;

    beforeEach(async () => {
      jest
        .spyOn(mockUsersService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));

      registeredUser = await service.register(testUser);
    });

    it('should return user if credentials are valid', async () => {
      jest
        .spyOn(mockUsersService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(registeredUser));

      const user = await service.validateUser(
        testUser.username,
        testUser.password,
      );

      expect(mockUsersService.create).toHaveBeenCalled();
      expect(mockUsersService.findOne).toHaveBeenCalledTimes(2);

      expect(user).toBeDefined();
      expect(user).toMatchSnapshot({
        id: expect.any(Number),
      });
    });

    it('should return null if password is invalid', async () => {
      jest
        .spyOn(mockUsersService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(registeredUser));

      const user = await service.validateUser(testUser.username, 'password');

      expect(mockUsersService.findOne).toHaveBeenCalledTimes(2);
      expect(user).toBeNull();
    });

    it('should return null if username is invalid', async () => {
      jest
        .spyOn(mockUsersService, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));

      const user = await service.validateUser('username', testUser.password);

      expect(mockUsersService.findOne).toHaveBeenCalledTimes(2);
      expect(user).toBeNull();
    });
  });
});
