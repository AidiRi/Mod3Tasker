class TasksController < ApplicationController

  def index
    tasks = Task.all
    render json: tasks,
      include: [:project =>
        {:except =>
          [:created_at, :updated_at]}],
      except: [:created_at, :updated_at]
  end

  def create
    task = Task.create(task_params)
    
    render json: task
  end


  private

  def task_params
    params.require(:task).permit(:name, :project_id, :status, :authenticity_token)
  end

end
