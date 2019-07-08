class TasksController < ApplicationController

  def index
    tasks = Task.all
    render json: tasks, include: [:project]
  end

end
