class Tag < ApplicationRecord

  has_many :items, dependent: :destroy

end
