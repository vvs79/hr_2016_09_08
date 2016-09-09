class Resume < ActiveRecord::Base
  belongs_to :user
  has_many   :educations
  has_many   :experiences

  validates :name, presence: true
end
