class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|
      t.string  :speciality
      t.date    :from
      t.date    :to
      t.string  :place
      t.integer :resume_id

      t.timestamps null: false
    end
  end
end
