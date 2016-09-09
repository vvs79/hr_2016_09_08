# include ActionView::Helpers::TextHelper
class ExperiencesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    respond_with Experience.all
  end

  def new
    respond_with Experience.new
  end

  def show
    respond_with Experience.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Experience doesn't exist!" }, status: 404
  end

  def create
    @experience = Experience.new(experience_params)
    if @experience.save
      render json: { success: "Experience was created" }
    else
      render json: { error: "Experience wasn't created!" }
    end
  end

  def edit
    respond_with Experience.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "EDIT Experience doesn't exist!" }, status: 404
  end

  def update
    @experience = Experience.find(params[:id])
    if @experience.update(experience_params)
      render json: { response: "UPDATE Experience was successfully updated" }, status: 200
    else
      render json: { error: "Experience wasn't updated!" }
    end
  end

  def destroy
    respond_with Experience.destroy params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "DEL Experience doesn't exist!" }, status: 404
  end

  private

    def experience_params
      params.require(:experience).permit(:specialty, :from, :to, :place, :resume_id)
    end
end
