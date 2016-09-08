class AddSalaryToResumes < ActiveRecord::Migration
  def change
    add_column :resumes, :salary,      :integer
    add_column :resumes, :scype,       :string
    add_column :resumes, :comment,     :text
    add_column :resumes, :user_id,     :integer
    add_column :resumes, :email,       :string
    add_column :resumes, :dateofbirth, :date
    add_column :resumes, :phone,       :string
    add_column :resumes, :city,        :string
    add_column :resumes, :proffession, :string
    add_column :resumes, :status,      :string
  end
end
