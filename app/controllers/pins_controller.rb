class PinsController < ApplicationController

    def my_pins
        render json: @current_user.pins, status: 200
    end

    def show
        friend_pins = Pin.where(user_id: params[:id])
        render json: friend_pins, status: 200
    end

    def update
        Pin.find_by(id: params[:id]).update!(pin_params)
        head :no_content
    end

    def create
        new_pin = Pin.create!(pin_params)
        render json: new_pin, status: 201
    end

    def destroy
        selected_pin = Pin.find(params[:id])
        selected_pin.destroy
        head :no_content
    end

    private

    def pin_params
        params.permit(:title, :longitude, :latitude, :address, :visit_date, :description, :user_id).with_defaults(user_id: @current_user.id)
    end

end
