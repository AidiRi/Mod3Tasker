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
    render json: project
  end

  def update
    project = Project.find(params[:id])
    project.update(project_params)

    render json: project
  end

  def destroy
    project = Project.find(params[:id])
    project.delete
  end


  private

  def project_params
    params.require(:project).permit(:name, :user_id)
  end
end
