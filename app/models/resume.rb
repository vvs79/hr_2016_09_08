class Resume < ActiveRecord::Base
  belongs_to :user
  has_many   :educations
  has_many   :experiences
  has_many   :communications

  validates :name, presence: true
end
