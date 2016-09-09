class AddSkillToResumes < ActiveRecord::Migration
  def change
    add_column :resumes, :skill,         :string
    add_column :resumes, :work,          :string
    add_column :resumes, :proff,         :string
    add_column :resumes, :language,      :string
    add_column :resumes, :level,         :string
    add_column :resumes, :communication, :string
    add_column :resumes, :mark,          :string
  end
end
