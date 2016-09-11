class AddDateToResumes < ActiveRecord::Migration
  def change
    add_column :resumes, :date, :string
    add_column :resumes, :mark, :string
  end
end
