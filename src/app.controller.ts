import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly Appservice : AppService){}

  @Get()
  @Render('index')
  index(){
    return {}
  }


  @Get('/signup')
  @Render('partials/form')
  signup(){
    return {}
  }

  @Get('/login')
  @Render('partials/login')
  login(){
    return {}
  }

  @Get('/tasks')
  @Render('partials/task')
  task(){
    return {}
  }
  @Get('/hello')
  getHello(): string {
    return this.Appservice.getHello();
  }
}

