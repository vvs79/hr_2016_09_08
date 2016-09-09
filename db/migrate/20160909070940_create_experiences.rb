class CreateExperiences < ActiveRecord::Migration
  def change
    create_table :experiences do |t|
      t.string  :speciality
      t.date    :from
      t.date    :to
      t.string  :place
      t.integer :resume_id

      t.timestamps null: false
    end
  end
end
