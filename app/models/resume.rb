class Resume < ActiveRecord::Base
  has_one :user

  validates :name, presence: true
end
