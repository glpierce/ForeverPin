class PinGroupsController < ApplicationController

    def my_groups
        render json: @current_user.pin_groups, status: 200
    end

    def update
        PinGroup.find_by(id: params[:id]).update!(pin_group_params)
        head :no_content
    end

    def create
        new_pin_group = PinGroup.create!(pin_group_params)
        render json: new_pin_group, status: 201
    end

    def destroy
        group_pins = Pin.where(pin_group_id: params[:id])
        group_pins.each {|pin| pin.update!(pin_group_id: nil)}
        selected_pin_group = PinGroup.find(params[:id])
        selected_pin_group.destroy
        head :no_content
    end

    private

    def pin_group_params
        params.permit(:user_id, :title, :description, :marker_color)
    end

end
