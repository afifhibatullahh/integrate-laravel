<?php

namespace Database\Factories;


use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'judul' => $this->faker->sentence(),
            'thumbnail' => $this->faker->imageUrl(),
            'konten' => $this->faker->paragraph(),
            'status' => 'Publish',
            'tgl_publikasi' => now(),
        ];
    }
}
