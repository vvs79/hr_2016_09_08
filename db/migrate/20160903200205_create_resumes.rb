class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
      t.string :name
      t.integer :age

      t.timestamps null: false
    end
  end
end
