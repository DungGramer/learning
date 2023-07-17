//
//  ViewController.swift
//  Dicee-iOS13
//
//  Created by Angela Yu on 11/06/2019.
//  Copyright © 2019 London App Brewery. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var diceImageView1: UIImageView!
    @IBOutlet weak var diceImageView2: UIImageView!
    
    var leftDiceNumber = 1
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        diceImageView1.image = UIImage(named: "DiceTwo")
        diceImageView2.image = UIImage(named: "DiceThree")
    }


    @IBAction func rollButtonPressed(_ sender: UIButton) {
        let diceArray = [
            UIImage(named: "DiceOne"),
            UIImage(named: "DiceTwo"),
            UIImage(named: "DiceThree"),
            UIImage(named: "DiceFour"),
            UIImage(named: "DiceFive"),
            UIImage(named: "DiceSix"),
        ];
        
        diceImageView1.image = diceArray[Int.random(in: 0...5)];
        
        diceImageView2.image = diceArray[Int.random(in: 0...5)];
    }
}

