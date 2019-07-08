class ProjectsController < ApplicationController

  def index
    projects = Project.all
    render json: projects,
      include: [:user =>
        {:except =>
          [:created_at, :updated_at]}],
      except: [:created_at, :updated_at]
  end

  def create
    project = Project.create(project_params)
  end


  private

  def project_params
    params.require(:project).permit(:name, :user_id)
  end
end
